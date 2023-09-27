import { forwardRef } from "react";

const PhotoPicker = forwardRef(({ onChangeHandler }, ref) => {
  return (
    <input
      type="file"
      hidden
      id="photoPicker"
      name="projectImage"
      onChange={onChangeHandler}
      ref={ref}
      accept="image/*"
    />
  );
});
export default PhotoPicker;
