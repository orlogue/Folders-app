const packager = require("electron-packager");
const options = {
  arch: "arm64",
  platform: process.platform,// this will automatically select darwin if darwin or win32 if win32
  dir: "./", // which directory to pack
  "app-copyright": "Copyright © 2022 orlogue",// fill this
  "app-version": "0.2.0",
  asar: true, // this will archive your source code.
  icon: "public/icons/mac/folders.icns",
  name: "Folders", // fill this
  ignore: [
    // list every thing that need to be ignore, so reference every single director and leave the build of the app and the files that are being used in the node module.
  ],
  out: "./build/releases",
  overwrite: true, // will overwrite whatever it might have written before.
  prune: true,
  version: "0.0.1",
  "version-string": {
    CompanyName: "Orlogue",// fill this
    FileDescription:
      "Folders" /*This is what display windows on task manager, shortcut and process*/,
    OriginalFilename: "",// fill this
    ProductName: "Folders",// fill this
    InternalName: "Folders-dev",// fill this
  },
};
packager(options, function done_callback(err, appPaths) {
  console.log(err);
  console.log(appPaths);
});
