import { useHttp } from "../../hooks/http.hook";
import imageNotFound from '../../resources/image_not_found.jpg'

const useRawgService = () => {
    const { loading, error, request, clearError } = useHttp();

    const _key = process.env.REACT_APP_API_KEY;
    const _path = 'https://api.rawg.io/api';

    const getAllGames = async (url = `${_path}/games?page_size=9&key=${_key}`) => {
        const res = await request(url);
        const arr = res.results.map(item => {
            return _transformShortData(item);
        });
        const nextPageUrl = res.next;
        return { arr, nextPageUrl };
    }

    const getGamesBySearch = async (str) => {
        const search = await request(`${_path}/games?search=${str}&key=${_key}`);
        const res = search.results.slice(0, 5).map(item => {
            return _transformShortData(item);
        });

        return res;
    }

    const getGameById = async (id) => {
        const res = await request(`${_path}/games/${id}?key=${_key}`);
        console.log(res)
        const screenshotsData = await request(`${_path}/games/${id}/screenshots?key=${_key}`);
        const screenshotsArr = screenshotsData.results.map(item => {
            return _transformScreenshots(item);
        });

        return {
            ..._transformData(res),
            screenshots: screenshotsArr
        };
    }

    const getGenres = async () => {
        const res = await request(`${_path}/genres?key=${_key}`);

        const arr = res.results.map(item => {
            return _transformShortData(item);
        })

        return arr;
    }

    const getGamesByGenres = async (genreName, pageNum) => {
        const res = await request(`${_path}/games?genres=${genreName}&key=${_key}&page=${pageNum}&page_size=9`);

        const data = res.results.map(item => {
            return _transformShortData(item);
        });

        const nextPageUrl = res.next;

        return { data, nextPageUrl };
    }

    const _transformData = ({ name, description, developers, id, background_image, genres, rating, released, reddit_url, platforms, website, tags, slag }) => {
        let dataPlatforms = platforms.map(item => {
            return item.platform.name;
        });

        return {
            name: name ? name : 'Name not found',
            description: description ? description : 'No description',
            developer: developers && developers.length > 0 ? developers[0].name : 'No info',
            id: id,
            img: background_image ? background_image : imageNotFound,
            genres: genres.length > 0 ? genres.map(item => item.name).join(', ') : 'No info',
            rating: rating ? `${rating}/5` : 'No info',
            released: released ? released : 'No info',
            platforms: dataPlatforms ? dataPlatforms : 'No info',
            community: reddit_url ? reddit_url : null,
            homepage: website ? website : null,
            tags: tags ? tags : null,
            slag: slag ? slag : name
        }
    }

    const _transformScreenshots = ({ id, image }) => {
        return {
            id: id ? id : null,
            image: image && id ? image : null
        }
    }

    const _transformShortData = ({ id, name, released, image_background, image, background_image, slug }) => {
        const setImgUrl = () => {
            if ((image || image_background || background_image) && id) {
                return image || image_background || background_image;
            } else {
                return null;
            }
        }

        const images = setImgUrl();

        return {
            id: id ? id : null,
            name: name ? name : 'Name not found',
            released: released ? released : 'No info',
            img: images ? images : imageNotFound,
            slug: slug ? slug : null
        }
    }

    return { loading, error, getAllGames, getGameById, clearError, getGenres, getGamesBySearch, getGamesByGenres };
}

export default useRawgService;