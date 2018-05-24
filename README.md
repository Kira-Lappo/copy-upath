# Copy uPath

Extension adds 'copy path' actions, which let you get file path Unix style.

## Examples

So you have file **C:\workspace\project\subfolder\source.c** in you **C:\workpsace\project** workspace

Here copy results are:

* `'Copy uPath'`                         : c:/workspace/project/subfolder/source.c
* `'Copy Relative uPath'`                : subfolder/source.c
* `'Copy uPath' with defined prefix` : /your-custom-prefix/c/workspace/project/source.c

## Settings

Extension is simple as hell, so it has the only configuration

* `culp.fullPath.prefix`: Prefix for full path. For ex. `/mnt/`
* `culp.fullPath.removeDiscColons`: Removing `:` from full path

## Release Notes

### 0.2.0

* Added copy file name command;
* Added full path configuration;
* Removed isWSLPath configuration.

### 0.1.0

* Initial release.