import { useHttp } from "../../hooks/http.hook";

const useRawgService = () => {
    const { loading, error, request, clearError } = useHttp();

    const _key = process.env.REACT_APP_API_KEY;
    const _path = 'https://api.rawg.io/api/games';

    const getAllGames = async (url = `${_path}?page_size=9&key=${_key}`) => {
        const res = await request(url);
        const arr = res.results.map(item => {
            return _transforData(item);
        });
        const nextPageUrl = res.next;

        return { arr, nextPageUrl };
    }

    const getGameById = async (id) => {
        const res = await request(`${_path}/${id}?key=${_key}`);

        return _transforData(res);
    }

    const _transforData = ({ name, description, developers, id, background_image, genres, rating, released, reddit_url, platforms, website }) => {
        let dataPlatforms = platforms.map(item => {
            return item.platform.name;
        });

        return {
            name: name,
            description: description ? description : 'No description for this game',
            developer: developers ? developers[0].name : null,
            id: id,
            img: background_image,
            genres: genres.map(item => item.name).join(', '),
            rating: rating,
            released: released,
            platforms: dataPlatforms,
            news: reddit_url ? reddit_url : null,
            homepage: website ? website : null
        }
    }
    return { loading, error, getAllGames, getGameById, clearError };
}

export default useRawgService;