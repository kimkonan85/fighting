import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;



const CoinsList = styled.ul`
`;

const Coin = styled.li`
    background-color: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.textColor};
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 10px;
    border: 1px solid white;
    
    a {
        display: flex;
        align-items: center;
        transition: color 0.5s ease-in;
        display: block;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor}
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color : ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface CoinInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}



function Coins() {
    const [ coins, setCoins ] = useState<CoinInterface[]>([])
    const [ loading, setLoading] = useState(true);
    const [ buttonState, setButtonState ] = useState(true);
    const getCoins = async() => {
        const response = await axios("https://proxy.cors.sh/https://api.coinpaprika.com/v1/coins");
        setCoins(response.data.slice(0,50));
        setLoading(false);
    }
    useEffect(() => {
        getCoins();
    });
    return (
        <Container>
            <Header>
                <Title>
                    코인
                </Title>
                
            </Header>
            {loading ? (
                "Loading..."
            ) : (
                <CoinsList>
                    {coins.map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`}>
                                <Img src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}></Img>
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    )
}

export default Coins;

