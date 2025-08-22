<?php

$file_dir = __DIR__ . "/storage/logs/laravel.log";

if (!file_exists($file_dir)) {
    echo "File Was Not found!";
    exit;
}

echo "................Clearing Logs Data................... \n";

file_put_contents($file_dir, "");

echo "Logs cleared successfully";