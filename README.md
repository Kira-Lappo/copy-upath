# Copy uPath

Extension adds 'copy path' actions, which let you get file path Unix style.

## Examples

So you have file **C:\workspace\project\source.c** in you **C:\workpsace\project** workspace

Here copy results are:

* `'Copy uPath'`                         : c:/workspace/project/source.c
* `'Copy Relative uPath'`                : /source.c
* `'Copy uPath' with 'isWSLPath = true'` : /mnt/c/workspace/project/source.c

## Settings

Extension is simple as hell, so it has the only configuration

* `culp.isWSLPath`:  Allows you to copy full path in form which can be used in WSL console

## Release Notes

### 0.1.0

Initial release.