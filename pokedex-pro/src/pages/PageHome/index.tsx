import styled from "styled-components";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Switch, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const PageHome = () => {
    // const [isLoading, setIsLoading] = useState(false);
    const [listaDePokemons, setListaDePokemons] = useState([]);

    const fetchListData = () => {
        axios.get("https://pokeapi.co/api/v2/pokemon/").then((response) => {
            const sortedArray = [...response.data.results];

            sortedArray.sort((a, b) => {
                return a.name.localeCompare(b.name); // ordena em ordem alfabetica
            });

            setListaDePokemons(sortedArray);
        });
    };

    useEffect(() => {
        fetchListData()
    }, []);

    return (
        <>
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
                        <Pokemon
                            key={item.name}
                            data={item}
                        />
                    ))}
                </Grid2>
            </MainStyled>
        </>
    );
};

type Pokemon = {
    data: {
        url: string;
    };
};

const Pokemon = ({ data }: Pokemon) => {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        axios.get(data.url).then((response) => {
            setDetails(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (details === null) {
        return (
            <Grid2>
                <h2>Carregando...</h2>
            </Grid2>
        );
    }

    return (
        <Grid2 md={4}>
            <b>{details.name}</b> EXP - {details.base_experience}
        </Grid2>
    );
};

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

export default PageHome;
