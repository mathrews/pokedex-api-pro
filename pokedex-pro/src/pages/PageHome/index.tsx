import styled from "styled-components";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Skeleton, Switch, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

type ResultsArray = {
    name: string;
    url: string;
};

const PageHome = () => {
    // const [isLoading, setIsLoading] = useState(false);
    const [listaDePokemons, setListaDePokemons] = useState<ResultsArray[]>([]);

    const fetchListData = () => {
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=300&offset=0.").then((response) => {
            const sortedArray: ResultsArray[] = [...response.data.results];

            sortedArray.sort((a, b) => {
                return a.name.localeCompare(b.name); // ordena em ordem alfabetica
            });

            setListaDePokemons(sortedArray);
        });
    };

    useEffect(() => {
        fetchListData();
    }, []);

    return (
        <>
            <Container>
                <HeaderStyled>
                    <Grid2
                        container
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                        <Grid2
                            xs
                            sm
                            md={2}>
                            <h1>PokeDex</h1>
                        </Grid2>
                        <Grid2
                            xs
                            sm
                            md={6}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Search"
                                variant="outlined"
                            />
                        </Grid2>
                        <Grid2
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}>
                            <h3>Dark Mode</h3>
                            <Switch
                                defaultChecked
                                color="secondary"
                            />
                        </Grid2>
                    </Grid2>
                </HeaderStyled>
                <MainStyled>
                    <Grid2
                        container
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                        }}>
                        {listaDePokemons.map((item) => (
                            <Grid2
                                md={4}
                                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Pokemon
                                    key={item.name}
                                    data={item}
                                />
                            </Grid2>
                        ))}
                    </Grid2>
                </MainStyled>
            </Container>
        </>
    );
};

type PokemonPropData = {
    data: {
        name: string;
        url: string;
    };
};

type Pokemon = {
    id: number;
    base_experience: number;
    name: string;
    sprites: {
        other: {
            dream_world : {
                front_default: string;
            }
        }
    }
}

const Pokemon = ({ data }: PokemonPropData) => {
    const [details, setDetails] = useState<Pokemon | null>(null);

    useEffect(() => {
        axios.get(data.url).then((response) => {
            setTimeout(() => {
                setDetails(response.data);
            }, 3000);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (details === null) {
        return (
            <Grid2
                md={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Skeleton
                    variant="rectangular"
                    width={100}
                    height={100}
                />
            </Grid2>
        );
    }

    return (
        <Grid2 md={4}>
            <PokemonCard>
                <img src={details.sprites.other.dream_world.front_default} />
                <div>#{details.id}</div>
                <h4>{details.name}</h4> EXP - {details.base_experience}
            </PokemonCard>
        </Grid2>
    );
};

const Container = styled.div`
    overflow: hidden;
`;

const HeaderStyled = styled.header`
    width: 100%;
    padding: 3em;
    border-bottom: 1px solid #c3c3c3;
    background-color: #f1f1f160;
`;

const MainStyled = styled.main`
    width: 100%;
    padding: 3em;
`;

const PokemonCard = styled.div`
    display: block;
    padding-top: 3em;
    padding-bottom: 3em;
    padding-right: 3em;
    padding-left: 3em;
    border-radius: 1em;
    background-image: linear-gradient(120deg, #FFFFFF20, #00000030);
    border: 2px solid #00000050;
    margin-bottom: 1em;

    & img {
        display: block;
        width: 10em;
        height: 10em;
    }
`;

export default PageHome;
