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

    const getGameById = async (id) => {
        const res = await request(`${_path}/${id}?key=${_key}`);
        /* const screenshots = await request(`${_path}/${id}/screenshots?key=${_key}`); */
        const search = await request(`https://rawg.io/api/games?search=witcher&key=b61c177e6f9d41ff870cb8c11cc140a2`)
        console.log(search)

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
            genres: genres.map(item => item.name).join(', '),
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
            image_background: image_background ? image_background : null,
            name: name ? name : null
        }
    }
    return { loading, error, getAllGames, getGameById, clearError, getGenres };
}

export default useRawgService;