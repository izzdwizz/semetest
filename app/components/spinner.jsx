import Image from 'next/image';
import React from 'react';
import loader from '../../public/assets/images/Loading.png';
function spinner() {
	return <Image src={loader} alt='loader' className='animate-spin relative' />;
}

export default spinner;
