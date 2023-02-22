import {PageBlock} from '../../components/PageBlock'
import {PageHeader} from '../../components/PageHeader'
import SearchInput from "../../components/SearchBar";
import {PageFilter} from "../../components/PageFilter";
import SelectInput from "../../components/SelectInput";
import {LabelInput} from "../../components/LabelInput";
import DateInput from "../../components/DateInput";
import {InputBox} from "../../components/InputBox";
import {DateBox} from "../../components/DateBox";
import {DataGrid, GridColDef, GridValueGetterParams, GridRenderCellParams} from '@mui/x-data-grid';
import Rating from '@mui/material/Rating';
import moment from 'moment';
import {useEffect, useState} from "react";
import {AppService} from "../../services/app.services";

const optionsPriority = [
    {value: '1', label: "1 Estrela"},
    {value: '2', label: "2 Estrela"},
    {value: '3', label: "3 Estrela"},
    {value: '4', label: "4 Estrela"},
    {value: '5', label: "5 Estrela"},
];

function handleSelectChange(value: string) {
    console.log(`Selected value: ${value}`);
}

function renderRating(params: GridRenderCellParams<number>) {
    return <Rating readOnly precision={0.1} value={params.value}/>;
}

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 90},
    {
        field: 'name',
        headerName: 'Nome',
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
        renderCell: renderRating,
        editable: true,
    },
    {
        field: 'actions',
        headerName: 'Ações',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
    },
];

const appServices = new AppService();

export const HomePage = () => {
        const [tasks, setTasks] = useState([])
        useEffect(() => {
            if (tasks.length == 0) {
                appServices.getTasks('').then((response) => {
                    console.log(response)
                    setTasks(response.data)
                })
            }
        }, [])

        return (
            <div>
                <PageBlock width={"100%"}>
                    <PageHeader>ToDo</PageHeader>
                    <SearchInput/>
                    <PageFilter>
                        <InputBox width="30%">
                            <LabelInput>Prioridade:</LabelInput>
                            <SelectInput options={optionsPriority} onChange={handleSelectChange}/>
                        </InputBox>
                        <InputBox width="30%">
                            <LabelInput>Conclusão:</LabelInput>
                            <DateBox>
                                <DateInput width="40%"/>
                                <LabelInput translatey="40%" marginl="20px">Até</LabelInput>
                                <DateInput width="40%"/>
                            </DateBox>
                        </InputBox>
                        <InputBox width="30%">
                            <LabelInput>Data:</LabelInput>
                            <DateBox>
                                <DateInput width="40%"/>
                                <LabelInput translatey="40%" marginl="20px">Até</LabelInput>
                                <DateInput width="40%"/>
                            </DateBox>
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
                            disableSelectionOnClick
                            experimentalFeatures={{newEditingApi: true}}
                        />
                    </div>
                </PageBlock>
            </div>
        )
    }
;