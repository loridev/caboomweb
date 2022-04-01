import RankList from "../components/Ranking/RankList"
import Select from "../UI/Select/Select";
import Form from "../components/Form/Form";
import Button from "../UI/Button/Button";
import {useEffect, useState} from "react";
import Http from "../utils/Http";
import RankItem from "../components/Ranking/RankItem";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

function Rankings() {
    const [data, setData] = useState([]);
    const [numPage, setNumPage] = useState(1);
    const [pagesShown, setPagesShown] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [numsOfPages, setNumsOfPages] = useState([0]);

    const refresh = (ev) => {
        ev.preventDefault();
        console.log(ev.target[0].value);
        console.log(ev.target[1].value);
        console.log(ev.target[2].value);
    }

    const changePage = (ev) => {
        setNumPage(Number.parseInt(ev.target.innerHTML));
        console.log(Number.parseInt(ev.target.innerHTML));
    }

    const getNumsOfPages = () => {
        if (numsOfPages.length > 3 && numPage >= 3) {
            if (numPage !== numsOfPages.length) {
                return [numPage - 1, numPage, numPage + 1];
            }
            return [numPage - 2, numPage -1, numPage];
        } else {
            return numsOfPages.slice(0, 3);
        }
    }

    const getData = async (mode, worldNum = 0, levelNum = 0, page = 0) => {
        setIsLoading(true);
        if (mode === 'indiv') {
            if (page === 0) {
                const responseFromApi = await Http.fetchData(
                    {url: `/api/v1/rankings/single?world_num=${worldNum}&level_num=${levelNum}`}
                );
                if (!responseFromApi.status) {
                    // FAILED
                } else {
                    const pagesArr = [];
                    for (let i = 1; i <= responseFromApi.data.numPages; i++) {
                        pagesArr.push(i);
                    }

                    setNumsOfPages(pagesArr);

                }
            } else {
                const responseFromApi = await Http.fetchData(
                    {url: `/api/v1/rankings/single?world_num=${worldNum}&level_num=${levelNum}&page=${page}` }
                );
                if (!responseFromApi.status) {
                    // FAILED
                } else {
                    setData(responseFromApi.data);
                }
            }
        } else {
            if (page === 0) {
                const responseFromApi = await Http.fetchData({url: '/api/v1/rankings/multi'});
                if (!responseFromApi.status) {
                    // FAILED
                } else {
                    const pagesArr = [];
                    for (let i = 1; i <= responseFromApi.data.numPages; i++) {
                        pagesArr.push(i);
                    }

                    setNumsOfPages(pagesArr);
                }
            } else {
                const responseFromApi = await Http.fetchData(
                    {url: `/api/v1/rankings/multi?page=${page}`}
                );
                if (!responseFromApi.status) {
                    // FAILED
                } else {
                    setData(responseFromApi.data);
                }
            }
        }
        setIsLoading(false);
    }

    useEffect(async () => {
        await getData('indiv', 1, 1);
        await getData('indiv', 1, 1, 1);
    }, []);

    useEffect(() => {
        console.log(numsOfPages)
    },[numsOfPages])

    return (
        <>
            <Form onSubmit={refresh}>
                <Select id="mode" placeholder="Selecct a mode" >
                    <option value="indiv">Single player</option>
                    <option value="multi">Multiplayer</option>
                </Select>
                <Select id="world" placeholder="Select a world">
                    <option value={1}>World 1</option>
                    <option value={2}>World 2</option>
                    <option value={3}>World 3</option>
                </Select>
                <Select id="level" placeholder="Select a level">
                    <option value={1}>Level 1</option>
                    <option value={2}>Level 2</option>
                    <option value={3}>Level 3</option>
                    <option value={4}>Level 4</option>
                </Select>
                <Button type="submit">Refresh</Button>
            </Form>
            <div className="container">
                <LoadingSpinner show={isLoading} />
                {
                    !isLoading ? (
                        <RankList mode="indiv">
                            <RankItem rank="1" player="Hola" score="50" />
                            <RankItem rank="2" player="Hola" score="49" />
                            <RankItem rank="3" player="Hola" score="48" />
                        </RankList>
                    ) : null
                }
            </div>
            {
                !isLoading ? (
                    <div className="horizontal-group">
                        <span>Page: </span>
                        {getNumsOfPages().map((pageShown) => <a onClick={changePage}>{pageShown}</a>)}
                        <a>Find myself</a>
                    </div>
                ) : null
            }
        </>
    )
}

export default Rankings
