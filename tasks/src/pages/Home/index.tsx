import {useNavigate} from "react-router-dom";
import {PageBlock} from '../../components/PageBlock'
import {PageHeader} from '../../components/PageHeader'
import {PageFilter} from "../../components/PageFilter";
import SelectInput from "../../components/SelectInput";
import {LabelInput} from "../../components/LabelInput";
import DateInput from "../../components/DateInput";
import {InputBox} from "../../components/InputBox";
import {DateBox} from "../../components/DateBox";
import {DataGrid, GridColDef, GridValueGetterParams, GridRenderCellParams} from '@mui/x-data-grid';
import moment from 'moment';
import React, {useEffect, useState, useCallback} from "react";
import {AppService} from "../../services/app.services";
import {Alert, Chip, Snackbar} from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextInput} from "../../components/TextInput";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
const appServices = new AppService();

export interface SnackbarType {
    children: string;
    severity: "error" | "warning" | "info" | "success";
}

const optionsPriority = [
    {value: '0', label: "BAIXA"},
    {value: '1', label: "MEDIA"},
    {value: '2', label: "ALTA"},
];

export const situacao_color = [
    "primary",
    "warning",
    "success",
]

export const situacao = [
    'PENDENTE',
    'ANDAMENTO',
    'CONCLUIDO'
]

export const prioridade_color = [
    "success",
    "warning",
    "error",
]

export const prioridade = [
    'BAIXA',
    'MEDIA',
    'ALTA'
]

const statusFormater = (cell: number) => {

    let color: any = situacao_color[cell]
    return (
        <Chip label={situacao[cell]} color={color} variant="outlined"/>
    );
};

const prioridadeFormater = (cell: number) => {

    let color: any = prioridade_color[cell]
    return (
        <Chip label={prioridade[cell]} color={color} variant="outlined"/>
    );
};


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export const HomePage = () => {
        const [tasks, setTasks] = useState([])
        const [priority, setPriority] = useState("1")
        const [eventAtStart, setEventAtStart] = useState(null)
        const [finishAtStart, setFinishAtStart] = useState(null)
        const [eventAtEnd, setEventAtEnd] = useState(null)
        const [finishAtEnd, setFinishAtEnd] = useState(null)
        const [newTaskName, setNewTaskName] = useState("")
        const [newTaskPriority, setNewTaskPriority] = useState("0")
        const [newTaskDate, setNewTaskDate] = useState(null)
        const [snackbar, setSnackbar] = useState<SnackbarType | null>(null);
        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const handleCloseSnackbar = () => setSnackbar(null);
        const navigate = useNavigate();

        useEffect(() => {
            // @ts-ignore
            let tokenaccess = JSON.parse(localStorage.getItem('token'));
            if (tokenaccess !== 'undefined' && tokenaccess !== null) {
            } else {
                navigate("/login");
            }
            if (tasks.length == 0) {
                appServices.getTasks('').then((response) => {
                    console.log(response)
                    setTasks(response.data)
                })
            }
        }, [])

        function handleSelectChange(value: string) {
            console.log(`Selected value: ${value}`);
            setPriority(value)
        }


        const handleNewTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setNewTaskName(value);
        };

        function handleNewTaskPriority(value: string) {
            setNewTaskPriority(value)
        }


        function searchWithFilter() {
            let params_search = new URLSearchParams();
            params_search.append('priority', priority)
            if (eventAtStart !== null) {
                // @ts-ignore
                params_search.append('event_at__gte', eventAtStart.toISOString())
            }
            if (eventAtEnd !== null) {
                // @ts-ignore
                params_search.append('event_at__lte', eventAtEnd.toISOString())
            }
            if (finishAtStart !== null) {
                // @ts-ignore
                params_search.append('finish_at__gte', finishAtStart.toISOString())
            }
            if (finishAtStart !== null) {
                // @ts-ignore
                params_search.append('finish_at__lte', finishAtEnd.toISOString())
            }
            let path_search = '?' + params_search.toString()
            appServices.getTasks(path_search).then((response) => {
                console.log(response)
                setTasks(response.data)
            })
        }

        const DeleteTask = (id: number) => {
            appServices.deleteTask(id).then(resp => {
                alert("Deletado com sucesso!!")
            })
            appServices.getTasks('').then((response) => {
                console.log(response)
                setTasks(response.data)
            })
        }

        const saveTask = () => {
            // @ts-ignore
            let newTask = {
                name: newTaskName,
                priority: newTaskPriority,
                // @ts-ignore
                event_at: newTaskDate.toISOString()
            }
            appServices.postTask(newTask).then((response) => {
                appServices.getTasks('').then((response) => {
                    console.log(response)
                    setTasks(response.data)
                })
            })
            handleClose()
        }

        const columns: GridColDef[] = [
            {
                field: 'name',
                headerName: 'Nome',
                flex: 1,
                editable: true,
            },
            {
                field: 'status',
                headerName: 'Status',
                renderCell: (params: any) => {
                    return statusFormater(params.value);
                },
                flex: 1,
                editable: true,
            },
            {
                field: 'event_at',
                headerName: 'Data e hora',
                flex: 1,
                editable: true,
                valueFormatter: params => moment(params?.value).format("DD/MM/YYYY hh:mm"),
            },
            {
                field: 'priority',
                headerName: 'Prioridade',
                flex: 1,
                renderCell: (params: any) => {
                    return prioridadeFormater(params.value);
                },
                editable: true,
            },
            {
                headerName: "A????es", field: "id", flex: 1, headerClassName: 'font-ident',
                renderCell: (params: any) => (
                    <strong>
                        <Button
                            onClick={() => {
                                DeleteTask(params.id)
                            }}
                        >
                            Deletar
                        </Button>
                    </strong>
                ),
            },
        ];


        const processRowUpdate = useCallback(
            async (newRow) => {
                const response = await appServices.putTask(newRow, newRow.id)
                setSnackbar({children: 'Alterado com sucesso!!', severity: 'success'});
                return response;
            },
            [],
        );

        return (
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Criar tarefa
                        </Typography>
                        <hr/>
                        <LabelInput marginl="10px">Nome:</LabelInput>
                        <InputBox width="100%">
                            <TextInput onChange={handleNewTaskName}/>
                        </InputBox>
                        <LabelInput marginl="10px">Prioridade:</LabelInput>
                        <InputBox width="100%">
                            <SelectInput options={optionsPriority} onChange={handleNewTaskPriority}></SelectInput>
                        </InputBox>
                        <InputBox width="100%">
                            <LabelInput>Data:</LabelInput>
                            <DateBox>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label=""
                                    value={newTaskDate}
                                    onChange={(newValue) => {
                                      setNewTaskDate(newValue);
                                    }}
                                  />
                                </LocalizationProvider>
                            </DateBox>
                        </InputBox>
                        <InputBox width="100%">
                            <Button onClick={saveTask}>Salvar</Button>
                        </InputBox>
                    </Box>
                </Modal>
                <PageBlock width={"100%"}>
                    <PageHeader>ToDo</PageHeader>
                    <PageFilter>
                        <InputBox width="30%">
                            <LabelInput>Prioridade:</LabelInput>
                            <SelectInput options={optionsPriority} onChange={handleSelectChange}/>
                        </InputBox>
                        <InputBox width="30%">
                            <LabelInput>Conclus??o:</LabelInput>
                            <DateBox>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label=""
                                    value={finishAtStart}
                                    onChange={(newValue) => {
                                      setFinishAtStart(newValue);
                                    }}
                                  />
                                </LocalizationProvider>
                                <LabelInput translatey="40%" marginl="20px">At??</LabelInput>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label=""
                                    value={finishAtEnd}
                                    onChange={(newValue) => {
                                      setFinishAtEnd(newValue);
                                    }}
                                  />
                                </LocalizationProvider>
                            </DateBox>
                        </InputBox>
                        <InputBox width="30%">
                            <LabelInput>Data:</LabelInput>
                            <DateBox>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label=""
                                    value={eventAtStart}
                                    onChange={(newValue) => {
                                      setEventAtStart(newValue);
                                    }}
                                  />
                                </LocalizationProvider>
                                <LabelInput translatey="40%" marginl="20px">At??</LabelInput>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label=""
                                    value={eventAtEnd}
                                    onChange={(newValue) => {
                                      setEventAtEnd(newValue);
                                    }}
                                  />
                                </LocalizationProvider>
                            </DateBox>
                        </InputBox>
                        <InputBox width="45%">
                            <Button onClick={searchWithFilter}>Pesquisar</Button>
                        </InputBox>
                        <InputBox width="45%">
                            <Button onClick={handleOpen}>Criar Tarefa</Button>
                        </InputBox>
                    </PageFilter>
                </PageBlock>
                <PageBlock width={"100%"}>
                    <div style={{height: 600}}>
                        <DataGrid
                            rows={tasks}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                            processRowUpdate={processRowUpdate}
                            disableSelectionOnClick
                            experimentalFeatures={{newEditingApi: true}}
                        />
                        {!!snackbar && (
                            <Snackbar
                                open
                                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                                onClose={handleCloseSnackbar}
                                autoHideDuration={6000}
                            >
                                <Alert {...snackbar} onClose={handleCloseSnackbar}/>
                            </Snackbar>
                        )}
                    </div>
                </PageBlock>
            </div>
        )
    }
;