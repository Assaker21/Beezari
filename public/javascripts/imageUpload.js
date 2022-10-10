FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode
);

FilePond.setOptions({
  imageResizeTargetWidth: 32,
  imageResizeTargetHeight: 32,
  imageResizeMode: "force",
  itemInsertLocation: "after",
  allowReorder: true,
});

FilePond.parse(document.body);

const pond = FilePond.find(document.querySelector(".filepond"));

for (i = 0; i < 8; i++) {
  const image = document.getElementById("old-image" + i.toString());
  if (image != null) pond.addFile(image.src);
}
