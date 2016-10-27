import config from '../../config';

const handleImage = name => `${config.imageServer}${name[0]}/${name[1]}/${name[2]}/${name}`;

export default handleImage;
