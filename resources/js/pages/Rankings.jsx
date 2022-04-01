import RankList from "../components/Ranking/RankList"
import Select from "../UI/Select/Select";
import Form from "../components/Form/Form";
import Button from "../UI/Button/Button";
import {useEffect, useState} from "react";
import Http from "../utils/Http";
import RankItem from "../components/Ranking/RankItem";

function Rankings() {
    const [data, setData] = useState([]);
    const [numPage, setNumPage] = useState(0);
    const [numPages, setNumPages] = useState(0);
    const [pagesShown, setPagesShown] = useState([]);

    const refresh = (ev) => {
        ev.preventDefault();
        console.log(ev.target[0].value);
        console.log(ev.target[1].value);
        console.log(ev.target[2].value);
    }

    const getData = async (mode, worldNum = 0, levelNum = 0, page = 0) => {
        if (mode === 'indiv') {
            if (page === 0) {
                const responseFromApi = await Http.fetchData(
                    {url: `/api/v1/rankings/single?world_num=${worldNum}&level_num=${levelNum}`}
                );
                if (!responseFromApi.status) {
                    // FAILED
                } else {
                    setNumPages(responseFromApi.data.numPages);
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
                    setNumPages(responseFromApi.data.numPages);
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
    }

    useEffect(() => {
        getData('indiv', 1, 1);
        getData('indiv', 1, 1, 1);
    }, []);

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
                <RankList mode="indiv">
                    <RankItem rank="1" player="Hola" score="50" />
                    <RankItem rank="2" player="Hola" score="49" />
                    <RankItem rank="3" player="Hola" score="48" />
                </RankList>
            </div>
            <div className="horizontal-group">
                <span>Page: </span>
                <a>1</a>
                <a>2</a>
                <a>3</a>
            </div>
        </>
    )
}

export default Rankings
