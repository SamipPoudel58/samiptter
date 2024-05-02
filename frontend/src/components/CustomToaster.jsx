import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
const CustomToaster = () => {
  const uiTheme = useSelector((state) => state.uiTheme);
  const { darkMode } = uiTheme;

  return (
    <Toaster
      toastOptions={
        darkMode
          ? {
              style: {
                fontSize: '1.6rem',
                background: '#333',
                color: '#fff',
              },
            }
          : {
              style: {
                fontSize: '1.6rem',
              },
            }
      }
    />
  );
};

export default CustomToaster;
