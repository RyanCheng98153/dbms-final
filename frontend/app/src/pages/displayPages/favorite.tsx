import { useEffect, useState } from "react";
import bookServices from "../../services/book-services";
 
const FavoriteList = () => {

    const [press, setPress] = useState<boolean>(false)
    
    const [favbook, setFavbook] = useState<string>('init')
    useEffect( () => {
        const fetchData = async () => {
            
            try {
                
                console.log('fetch')
                const response = await (await bookServices.getBooks()).data
                
                console.log('response')
                console.log(response)

                const isbn = response[0].ISBN
                console.log('isbn')
                console.log(isbn)

                if(!response) return
                setFavbook(isbn)

            } catch (error) {
            console.error('An error occurred while fetching data:', error )
            }
        }
        fetchData()
    }, [press])
    

    return (
        <div>
            <div>
                my favorite
            </div>

            <button onClick={()=>{setPress(!press)}}>
                press
            </button>
            
            <div>
                {press + favbook}
            </div>

        </div>
    );
};

 
export default FavoriteList;