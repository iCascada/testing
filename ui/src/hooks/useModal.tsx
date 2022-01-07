import {useSnackbar, VariantType} from "notistack"
import {modalShowDuration} from "../config/settings"

export const UseModal = () => {
  const { enqueueSnackbar } = useSnackbar();

  const message = (message: string, variant: VariantType = 'success') => {
    enqueueSnackbar(message, {
      variant: variant,
      autoHideDuration: modalShowDuration,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      }
    });
  }

  return {
    message
  }

};

export default UseModal;