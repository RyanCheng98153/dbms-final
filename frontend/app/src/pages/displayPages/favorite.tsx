import { useEffect, useState } from "react";
import bookServices from "../../services/book-services";
 
const FavoriteList = () => {
    
    const [favbook, setFavbook] = useState<string>('init')
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await bookServices.getById('1')
                console.log(response)
                
                if(!response) return
                setFavbook(response.data)

            } catch (error) {
            console.error('An error occurred while fetching data:', error )
            }
        }
        fetchData()
    }, [])
    

    return (
        <div>
            <div>
                my favorite
            </div>
            
            <div>
                {favbook}
            </div>

        </div>
    );
};

 
export default FavoriteList;