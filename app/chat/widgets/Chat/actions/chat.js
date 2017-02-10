import axios from 'axios';

export const send = values => axios.post('/send/', values);