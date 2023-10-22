import styled from "styled-components";
// import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Switch, TextField } from "@mui/material";

type InfosProps = {
    id?: number;
    name?: string;
};

const infos: InfosProps[] = [
    {
        id: 1,
        name: "Mateus",
    },
    {
        id: 2,
        name: "Mateus",
    },
    {
        id: 3,
        name: "Junin",
    },
    {
        id: 1,
        name: "Mateus",
    },
    {
        id: 2,
        name: "Mateus",
    },
    {
        id: 3,
        name: "Junin",
    },
];

const PageHome = () => {
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
                    sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
                    {infos.map((item) => (
                        <Grid2
                            md={4}
                            sx={{ display: "flex", justifyContent: "center" }}
                            >
                            <div>
                                <h2>#{item.id}</h2>
                                <h1>{item.name}</h1>
                            </div>
                        </Grid2>
                    ))}
                </Grid2>
            </MainStyled>
        </>
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
