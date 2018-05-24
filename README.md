# Copy uPath

Extension adds 'copy path' actions, which let you get file path in Unix style.

## Examples

So you have file `C:\workspace\project\subfolder\source.c` in your `C:\workpsace\project` workspace

Here copy results are:

* `'Copy uPath'`                         : c:/workspace/project/subfolder/source.c
* `'Copy Relative uPath'`                : subfolder/source.c
* `'Copy File Name'`                : source.c
* `'Copy uPath' with defined prefix` : /your-custom-prefix/c/workspace/project/source.c

## Settings

Extension is simple as hell, so it has few configurations:

* `culp.fullPath.prefix`: Prefix for full path. For ex. `/mnt/`
* `culp.fullPath.removeDiscColons`: Removing `:` from full path

## Release Notes

### 0.2.0

* Added copy file name command;
* Added full path copy configuration;
* Removed isWSLPath configuration.

### 0.1.0

* Initial release.