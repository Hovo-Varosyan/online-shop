import axios from 'axios';
import {storeData} from '../store';
import '../assets/filter.scss'
export default function Filter() {

    async function handleSubmit (category)   {
        try {
            const response = await axios.get(`http://localhost:4000/?category=${category}`);
            storeData.updateData(response.data.data)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="presentation">
            Категории:
            <button onClick={() => handleSubmit('Shirts')}>Shirts</button>
            <button onClick={() => handleSubmit('Pants')}>Pants</button>
            <a href='/'>All</a>

        </div>
    );
}
