import { useHttp } from "../../hooks/http.hook";
import imageNotFound from '../../resources/image_not_found.jpg'

const useRawgService = () => {
    const { loading, error, request, clearError } = useHttp();

    const _key = process.env.REACT_APP_API_KEY;
    const _path = 'https://api.rawg.io/api/games';

    const getAllGames = async (url = `${_path}?page_size=9&key=${_key}`) => {
        const res = await request(url);
        const arr = res.results.map(item => {
            return _transformData(item);
        });
        const nextPageUrl = res.next;

        return { arr, nextPageUrl };
    }

    const getGamesBySearch = async (str) => {
        const search = await request(`${_path}?search=${str}&key=${_key}`);
        const res = search.results.slice(0, 5).map(item => {
            return _transformSearchResults(item);
        });
        console.log(res)

        return res;
    }

    const getGameById = async (id) => {
        const res = await request(`${_path}/${id}?key=${_key}`);
        /* const screenshots = await request(`${_path}/${id}/screenshots?key=${_key}`); */
        console.log(res)
        return _transformData(res);
    }

    const getGenres = async () => {
        const res = await request(`https://api.rawg.io/api/genres?key=${_key}`);

        const arr = res.results.map(item => {
            return _transformGenres(item);
        })

        return arr;
    }

    const _transformData = ({ name, description, developers, id, background_image, genres, rating, released, reddit_url, platforms, website, tags }) => {
        let dataPlatforms = platforms.map(item => {
            return item.platform.name;
        });

        return {
            name: name ? name : 'Name not found',
            description: description ? description : 'No description for this game',
            developer: developers ? developers[0].name : 'No info about developers',
            id: id,
            img: background_image ? background_image : imageNotFound,
            genres: genres.length > 0 ? genres.map(item => item.name).join(', ') : 'No info',
            rating: rating ? `${rating}/5` : 'No info about rating',
            released: released ? released : 'No info about release',
            platforms: dataPlatforms ? dataPlatforms : 'No info about platforms',
            community: reddit_url ? reddit_url : null,
            homepage: website ? website : null,
            tags: tags ? tags : null
        }
    }

    const _transformGenres = ({ games, id, image_background, name }) => {
        return {
            games: games ? games : null,
            id: id,
            image_background: image_background ? image_background : imageNotFound,
            name: name ? name : 'Name not found'
        }
    }

    const _transformSearchResults = ({ id, name, background_image, released }) => {
        return {
            id: id,
            name: name ? name : 'Name not found',
            background_image: background_image ? background_image : imageNotFound,
            released: released ? released : 'No info'
        }
    }

    return { loading, error, getAllGames, getGameById, clearError, getGenres, getGamesBySearch };
}

export default useRawgService;