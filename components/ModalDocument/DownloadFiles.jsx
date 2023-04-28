import { useEffect, useState } from "react"
import { DocumentApi} from "../../backendApi/backendApi";
import { Avatar, Checkbox, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";

export const DownloadFiles = ({ Datos }) => {
    return (
        <>
            <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>

                {
                    Datos.map((datos, index) => {
                        console.log(datos);
                        let name = datos.doc_name;

                        return (
                            <>
                                <a key={datos.doc_path} href={`${DocumentApi}/${datos.doc_path}`} target="_blank">
                                    <ListItem >
                                        <ListItemButton>
                                            {
                                                (name.includes('.pdf'))
                                                    ? <img
                                                        alt={`pdf`}
                                                        width={100}
                                                        height={100}
                                                        style={{ margin: 10, marginRight: 30 }}
                                                        src={`/pdf.png`}
                                                    />
                                                    : <img
                                                        alt={`imagenes`}
                                                        width={100}
                                                        height={100}
                                                        style={{ margin: 10, marginRight: 30 }}
                                                        src={`${DocumentApi}/${datos.doc_path}`}
                                                    />
                                            }
                                            <ul>
                                                <li>
                                                    <h5 style={{ display: 'block' }}><b>Document Name: </b></h5>
                                                </li>
                                                <li>
                                                    <ListItemText primary={`${datos.doc_name}`} />
                                                </li>
                                            </ul>
                                        </ListItemButton>
                                    </ListItem>
                                </a>

                                <Divider variant="inset" component="li" />
                            </>
                        )
                    })
                }
            </List>
        </>
    )
}
