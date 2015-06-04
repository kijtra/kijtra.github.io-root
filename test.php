<?php
header('Content-Type: text/plain');
foreach(scandir(__DIR__.'/content/post') as $file) {
    if (!preg_match('#\A(\d{4}-\d{2}-\d{2})([^\.]*)\.md\z#', $file, $m)) {
        continue;
    }

    $date = $m[1];
    $slug = $m[2];
    $content = file_get_contents(__DIR__.'/content/post/'.$file);
    $yaml_src = preg_replace('#\A(---.*?---[\r\n]).*\z#is', '$1', trim($content));

    $yamls = array();
    foreach(explode("\n", $yaml_src) as $line) {
        $line = trim($line);
        if (empty($line) || '-' === $line{0}) {
            continue;
        }

        preg_match('#\A([^\:]*):(.*?)\z#', $line, $ex);
        $ykey = str_replace(array('summary', 'categories', 'tags'), array('description', 'tag', 'tag'), $ex[1]);
        $yval = NULL;
        if (!empty($ex[2])) {
            $str = trim($ex[2], " \r\n\t\"");
            if ('[' === $str{0}) {
                $str = trim($str, "[]");
                $arr = array();
                foreach(explode(",", $str) as $val) {
                    $val = trim($val, " \r\n\t\"");
                    $val = str_replace('-', ' ', $val);
                    $arr[] = $val;
                }
                $yval = '["'.implode('", "', $arr).'"]';
            } else {
                $yval = '"'.$str.'"';
            }
        }
        $yamls[$ykey] = str_replace(array("\n","\r","\t"), "", $yval);
        if (empty($yamls['date']) || false === strpos($yamls['date'], 'T')) {
            $yamls['date'] = '"'.$date."T00:00:00+09:00".'"';
        }
        if (empty($yamls['slug'])) {
            $yamls['slug'] = '"'.trim($slug, '-').'"';
        }
    }

    $yaml = '---'.PHP_EOL;
    foreach(array('title', 'slug', 'date', 'description', 'tag') as $key) {
        $yaml .= $key.': '.$yamls[$key].PHP_EOL;
    }
    $yaml .= '---'.PHP_EOL;

    $content = str_replace($yaml_src, $yaml, $content);
    file_put_contents(__DIR__.'/content/post/'.$file, $content);
}
