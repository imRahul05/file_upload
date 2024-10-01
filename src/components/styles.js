const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, #f0f0f0, #d9d9d9)',
      padding: '20px',
    },
    card: {
      background: 'white',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      width: '90%',
      maxWidth: '500px',
      textAlign: 'center',
    },
    title: {
      fontSize: '28px',
      marginBottom: '25px',
      color: '#333',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      marginBottom: '25px',
      alignItems: 'center', // Center the form elements within the container
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      marginBottom: '25px',
      alignItems: 'center', // Center the buttons within the container
    },
    uploadButton: {
      backgroundColor: '#52c41a', // Green color for the upload button
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      width: '60%', // Set the width of the buttons to 60%
      textAlign: 'center', // Center the text within the button
    },
    viewFilesButton: {
      backgroundColor: '#1890ff', // Blue color for the view files button
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      width: '60%', // Set the width of the buttons to 60%
      textAlign: 'center', // Center the text within the button
    },
    disabledButton: {
      backgroundColor: '#a0a0a0', // Grey color for the disabled button
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'not-allowed',
      width: '60%', // Set the width of the buttons to 60%
      textAlign: 'center', // Center the text within the button
    },
  };
  
  export default styles;