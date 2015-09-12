<?php
header('content-type: text/html; charset=utf-8');

function unlinkRecursive($dir, $deleteRootToo) {
	if (!$dh = @opendir($dir)) {
		return;
	}
	while (false !== ($obj = readdir($dh))) {
		if ($obj == '.' || $obj == '..') {
			continue;
		}

		$file = $dir . '/' . $obj;

		if (is_dir($file)) {
			$filelastmodified = filemtime($file . "/.");
			if ((time() - $filelastmodified) > 10 * 60) {
				unlinkRecursive($dir . '/' . $obj, true);
			}
		} else {
			$filelastmodified = filemtime($file);
			if ((time() - $filelastmodified) > 10 * 60) {
				@unlink($file);
			}
		}
	}

	closedir($dh);

	if ($deleteRootToo) {
		@rmdir($dir);
	}

	return;
}
?>
