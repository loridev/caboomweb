function RankItem(props) {
    return (
        <tr>
            <td>{props.rank}</td>
            <td>{props.player}</td>
            <td>{props.score}</td>
        </tr>
    )
}

export default RankItem
