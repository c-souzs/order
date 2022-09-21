import React from 'react'
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

const ErrorToast = (props) => {
    React.useEffect(() => {
        if(props.show) toast.error(props.message);
    }, [props.show, props.message]);

    return (
        <Toaster 
            position='top-right'
            toastOptions={
                {
                    error: {
                        duration: 3000
                    },
                    style: {
                        backgroundColor: '#111',
                        color: '#fff'
                    }
                }
            }
        />
    )
}

export default ErrorToast