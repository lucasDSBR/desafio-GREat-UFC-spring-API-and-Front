import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { GET_INDEX_PERPAGE, DELL_INDEX, POST_INDEX, PUT_INDEX } from '../../api/api';
import DataFetch from '../../services/DataFetch';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
function createData(id, nome, cpf, rg, dataNascimento, nomeMae, dataCadastro) {
  return { id, nome, cpf, rg, dataNascimento, nomeMae, dataCadastro};
}

var rows = [];
var pages = [];
var nexts = [];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nome'},
  { id: 'calories', numeric: false, disablePadding: false, label: 'CPF'},
  { id: 'fat', numeric: false, disablePadding: false, label: 'RG'},
  { id: 'carbs', numeric: false, disablePadding: false, label: 'Data de nascimento'},
  { id: 'protein', numeric: false, disablePadding: false, label: 'Nome da mãe'},
  { id: 'dataCadastro', numeric: false, disablePadding: false, label: 'Data de cadastro'},
  { id: 'opcoes', numeric: false, disablePadding: false, label: 'Opções'},
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => { onRequestSort(event, property); };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.numeric ? 'center' : 'center'} padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {

  const { numSelected } = props;

  return (
    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, ...(numSelected > 0 && { bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)})}}>
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} Selecionado(s)
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Usuários registrados
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};



export default function List() {
  const [erro, setErro] = React.useState(false);
  const {loading, error, request } = DataFetch();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [totPages, setTotPages] = React.useState();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlertFlot, setOpenAlertFlot] = React.useState(false);
  const [id, setId] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [rg, setRg] = React.useState("");
  const [nomeMae, setNomeMae] = React.useState("");
  const [dataNascimento, setDataNascimento] = React.useState("");
  const [dataCadastro, setDataCadastro] = React.useState("");
  const [nomeSearch, setNomeSearch] = React.useState("");
  const [cpfSearch, setCpfSearch] = React.useState("");
  const [rgSearch, setRgSearch] = React.useState("");
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);


  useEffect(() => { if(pages.length == 0) handleSubmit(0) }, []); // Utilizado para realizar primeira requisição para listar ususários registrados no sistema.
  const handleCloseDialogEdit = () => { setOpenDialogEdit(false);} // Utilizado para abrir dialog de edição de usuários.
  const handleClickAlert = () => { setOpenAlert(true); }; 
  const deleteItem = (idItem, cpf) => { dellItem(idItem, cpf);} // Utilizado para chamar função para realizar esclusão de ususário.
  const handleCloseAlertFlot = () => { setOpenAlertFlot(false);} // Utilizado para abrir alerta flutuante.
  const handleChangePage = (event, newPage) => { setPage(newPage); nextPage(newPage);}; // Utilizado para realizar o 'next' das páginas da tabela.
  const handleChangeRowsPerPage = (event) => { setRowsPerPage(parseInt(event.target.value, 6)); setPage(0);};
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const handleCloseAlert = (event, reason) => { if (reason === 'clickaway') return; setOpenAlert(false); };

  const handleClickOpenDialogEdit = (dataUser) => {
    setId(dataUser.id);
    setNome(dataUser.nome)
    setCpf(dataUser.cpf)
    setRg(dataUser.rg)
    setNomeMae(dataUser.cpf)
    setDataNascimento(dataUser.dataNascimento)
    setDataCadastro(dataUser.dataCadastro)
    setOpenDialogEdit(true);
  };
  

  // Função para realizar a exclusão de usuários + registro de log.
  async function dellItem(idItem, cpf){
    const bodyLog = { cpfUsuarioAlterado: cpf,  acao: "Exclusão",  dataLog: Date.now()}
    const {url, options} = await DELL_INDEX('user', idItem)
    const {response, json} = await request(url, options);
    if(response.status === 200) {
      rows.splice(rows.indexOf(rows.find(item => item.id == idItem)), 1);
      setTotPages(totPages -1);
      handleClickAlert();
      const {url, options} = await POST_INDEX('logs', bodyLog)
      const {response, json} = await request(url, options);
    }else{

    }
  }


  // Função para realizar a busca de usuários + registro de log.
  async function searchItem(){
    const bodyLog = { cpf,  acao: "Busca",  dataLog: Date.now()}
    const body = { nome: nomeSearch, cpf: cpfSearch, rg: rgSearch}
    const {url, options} = await POST_INDEX('userFilter', body)
    const {response, json} = await request(url, options);
    if(response.status === 200) {
      const {url, options} = await POST_INDEX('logs', bodyLog);
      const {response} = await request(url, options);
      rows = [];
      json.forEach(element => {
        rows.push( 
          createData( element.id,  element.nome,  element.cpf,  element.rg, 
            element.dataNascimento? element.dataNascimento : "Não informado", 
            element.nomeMae, element.dataCadastro? element.dataCadastro : "Não informado"))
      });
    }else{
      setErro(true)
    }
  }
  
  // Função para realizar a edição de usuários + registro de log.
  async function editItem(){
    const bodyLog = { cpfUsuarioAlterado: cpf,  acao: "Edição",  dataLog: Date.now()}
    const body = { id, nome,  cpf,  rg,  nomeMae, dataNascimento, dataCadastro  }
    const {url, options} = await PUT_INDEX('user', body)
    const {response, json} = await request(url, options);
    if(response.status === 200) {
      const {url, options} = await POST_INDEX('logs', bodyLog)
      const {response, json} = await request(url, options);
      setOpenAlertFlot(true);
      handleCloseDialogEdit();
    }else{
      setErro(true)
    }
  }
  
  // Função para realizar o 'next' da tabela
  async function handleSubmit(pag){
    pages.push(pag);
    nexts.push(pag);
    const {url, options} = await GET_INDEX_PERPAGE('page', pag)
    const {response, json} = await request(url, options);
    if(response.status === 200) {
      json.content.forEach(element => {
        rows.push( 
          createData( element.id,  element.nome,  element.cpf,  element.rg, 
            element.dataNascimento? element.dataNascimento : "Não informado", 
            element.nomeMae, element.dataCadastro? element.dataCadastro : "Não informado"))
      });
      setTotPages(json.totalElements);
    }else{

    }
  }

  function nextPage(pag){
    if(pages.length > 0){
      pages.push(pag);
      if(pag > pages.at(-2) && nexts.indexOf(pag) == -1) handleSubmit(pag)
    }
  }
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  return (
    <>
    <Box sx={{ width: '95%'}}>
      <TextField id="standard-basic" label="Nome" variant="standard" sx={{m: 2}} value={nomeSearch} onChange = {(e) => setNomeSearch(e.target.value)}/>
      <TextField id="standard-basic" label="CPF" variant="standard" sx={{m: 2}} value={cpfSearch} onChange = {(e) => setCpfSearch(e.target.value)}/>
      <TextField id="standard-basic" label="RG" variant="standard" sx={{m: 2}} value={rgSearch} onChange = {(e) => setRgSearch(e.target.value)}/>
      <Button variant="contained" sx={{m: 2}}  onClick={(nomeSearch == "" && cpfSearch == "" && rgSearch == "") ? searchItem : searchItem}>Buscar</Button>
    </Box>
      <Box sx={{ width: '95%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={'medium'}
            >
              <EnhancedTableHead numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={rows.length}/>
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    var convertDataCadastro = new Date(row.dataCadastro)
                    var convertDataBirth = new Date(row.dataNascimento)
                    let dateFormatedRegister = ((convertDataCadastro.getDate() )) + "/" + ((convertDataCadastro.getMonth() + 1)) + "/" + convertDataCadastro.getFullYear(); 
                    let dateFormatedBirth = ((convertDataBirth.getDate() )) + "/" + ((convertDataBirth.getMonth() + 1)) + "/" + convertDataBirth.getFullYear(); 
                    return (
                      <TableRow>
                        <TableCell component="th" id={labelId} scope="row" align="center" padding="none">
                          {row.nome}
                        </TableCell>
                        <TableCell align="center">{row.cpf}</TableCell>
                        <TableCell align="center">{row.rg}</TableCell>
                        <TableCell align="center">{dateFormatedBirth}</TableCell>
                        <TableCell align="center">{row.nomeMae}</TableCell>
                        <TableCell align="center">{dateFormatedRegister}</TableCell>
                        <TableCell align="center">
                        <Tooltip title="Editar">
                          <IconButton onClick={ e => handleClickOpenDialogEdit(row)}>
                            <EditIcon/>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                          <IconButton onClick={ e => deleteItem(row.id, row.cpf)}>
                            <DeleteIcon/>
                          </IconButton>
                        </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[6]}
            component="div"
            count={totPages}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
            Usuario removido com sucesso !
          </Alert>
        </Snackbar>
      </Box>
      <Dialog open={openDialogEdit} onClose={handleCloseDialogEdit} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            {"Edição de usuário"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <div>
                <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                    <TextField  id="standard-basic"  label="Nome"  variant="standard"  margin="dense"  className="container-register-input" value={nome} onChange = {(e) => setNome(e.target.value)}
                    />
                    <TextField  id="standard-basic"  label="RG"  variant="standard"  margin="dense"  className="container-register-input" value={rg} onChange = {(e) => setRg(e.target.value)}/>
                    <TextField  id="standard-basic"  label="CPF"  variant="standard"  margin="dense"  className="container-register-input" value={cpf} onChange = {(e) => setCpf(e.target.value)}/>
                    <TextField  id="standard-basic"  label="Nome da mãe"  variant="standard"  margin="dense"  className="container-register-input" value={nomeMae} onChange = {(e) => setNomeMae(e.target.value)}/>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker label="Data de nascimento" value={dataNascimento} onChange={(e) => { setDataNascimento(e) }} renderInput={(params) => <TextField {...params} />} />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker label="Data de cadastro" value={dataCadastro} onChange={(e) => { setDataCadastro(e) }} renderInput={(params) => <TextField {...params} />} />
                    </LocalizationProvider>
                </Box>
                </div>
            </DialogContentText>
            {error ? <Alert variant="outlined" severity="error">
              {error}
            </Alert> : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogEdit} variant="contained" color="error">Cancelar</Button>
            <Button variant="contained" onClick={editItem}  disabled={cpf == "" || rg == "" || nome == "" || nomeMae == "" || (dataNascimento == "" || dataNascimento == null) || (dataCadastro == "" || dataCadastro == null)}>
              Editar
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={openAlertFlot} autoHideDuration={5000} onClose={handleCloseAlertFlot}>
          <Alert onClose={handleCloseAlertFlot} severity="success" sx={{ width: '100%' }}>
            Usuário editado com sucesso !
          </Alert>
        </Snackbar>
    </>
  );
}
