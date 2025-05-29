import React, { useState } from 'react'

const useCodeSubmission = () => {
    const [isloading, setIsloading] = useState<boolean>(false);

    return {
        isloading,
        setIsloading
    }

}

export default useCodeSubmission