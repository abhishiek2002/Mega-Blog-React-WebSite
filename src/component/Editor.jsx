import JoditEditor from "jodit-react";
import { useMemo } from "react";

const Editor = () => {
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );

  return (
    // <JoditEditor
    //   config={config}
    //   tabIndex={1} // tabIndex of textarea
    // />
    null
  );
};

export default Editor;
