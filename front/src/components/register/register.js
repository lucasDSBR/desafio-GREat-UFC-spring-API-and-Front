import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { POST_INDEX, PUT_INDEX, GET_INDEX } from '../../api/api';
import DataFetch from '../../services/DataFetch';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import HistoryIcon from '@mui/icons-material/History';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './register.css';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

var logs = [];

function Register(props) {
    const [erro, setErro] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openLogs, setOpenLogs] = React.useState(false);
    const [nome, setNome] = React.useState("");
    const [cpf, setCpf] = React.useState("");
    const [rg, setRg] = React.useState("");
    const [nomeMae, setNomeMae] = React.useState("");
    const [dataNascimento, setDataNascimento] = React.useState("");
    const [dataCadastro, setDataCadastro] = React.useState("");
    const {loading, error, request } = DataFetch();
    const [openAlert, setOpenAlert] = React.useState(false);

    const handleClickOpen = () => { setOpen(true);}; // Abrir dialog de registro
    const handleClose = () => { setOpen(false); }; // Fechar dialog de registros
    const handleClickOpenLogs = () => { setOpenLogs(true); getLogs();}; // Abrir dialog de logs
    const handleCloseLogs = () => { setOpenLogs(false);}; // Fechar dialog de logs
  
    // Função para realizar a requisição logs no sistema.
    async function getLogs(){
      const {url, options} = await GET_INDEX('logs', null);
      const {response, json} = await request(url, options);
      console.log("response: ", response);
      console.log("json: ", error);
      if(response.status === 200) {
        json.forEach(log => {
          logs.push(log)
        })
      }else{

      }
    }

    // Função para realizar o cadastro ou atualização de usuário no sistema. Além disso, realiza o registro de logs no sistema.
    async function handleSubmit(){
      const bodyLog = { cpfUsuarioAlterado: cpf,  acao: props.typeIcon != "edit" ? "Registro" : "Edição",  dataLog: Date.now()}
      const body = { nome,  cpf,  rg,  nomeMae, dataNascimento, dataCadastro: Date.now() }
      const {url, options} = props.typeIcon != "edit" ? await POST_INDEX('user', body) : await PUT_INDEX('user', body);
      const {response, json} = await request(url, options);
      if(response.status === 200) {
        setOpenAlert(true);
        setOpen(false); 
        setNome(""); setCpf(""); setRg(""); setNomeMae(""); setDataNascimento(""); setDataCadastro("");
        const {url, options} = await POST_INDEX('logs', bodyLog)
        const {response, json} = await request(url, options);
      }else{
        setErro(true)
      }
    }

    const handleCloseAlert = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlert(false);
    };
  
    return (
      <>
        <Box sx={{ width: '95%', display: 'flex', justifyContent: 'flex-end'}}>
          <Button className="btn" sx={{m: 2}} onClick={handleClickOpenLogs} variant="contained" >
            Ver logs
          </Button>
          <Button className="btn" sx={{m: 2}} onClick={handleClickOpen} variant="contained" color="success">
            Novo usuário
          </Button>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Novo usuário"}
          </DialogTitle>
          <DialogContent>
          
            <DialogContentText id="alert-dialog-description">
                <div>
                <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                    <TextField required id="standard-basic" label="Nome" variant="standard" margin="dense" className="container-register-input"value={nome}onChange = {(e) => setNome(e.target.value)} />
                    <TextField requiredid="standard-basic" label="RG" variant="standard" margin="dense" className="container-register-input"value={rg}onChange = {(e) => setRg(e.target.value)}/>
                    <TextField requiredid="standard-basic" label="CPF" variant="standard" margin="dense" className="container-register-input"value={cpf}onChange = {(e) => setCpf(e.target.value)}/>
                    <TextField requiredid="standard-basic" label="Nome da mãe" variant="standard" margin="dense" className="container-register-input"value={nomeMae}onChange = {(e) => setNomeMae(e.target.value)}/>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Data de nascimento"
                        value={dataNascimento}
                        onChange={(e) => {
                          setDataNascimento(e)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                </Box>
                </div>
            </DialogContentText>
            {error ? <Alert variant="outlined" severity="error">
              {error}
            </Alert> : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="error">Cancelar</Button>
            <Button variant="contained" onClick={handleSubmit} disabled={cpf == "" || rg == "" || nome == "" || nomeMae == "" || (dataNascimento == "" || dataNascimento == null)}>
              Cadastrar
            </Button>
          </DialogActions>
        </Dialog>
        {/* Lista de logs */}
        <Dialog
          open={openLogs}
          onClose={handleCloseLogs}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Logs"}
          </DialogTitle>
          <DialogContent>
          
            <DialogContentText id="alert-dialog-description">
                <div>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {logs.map( log => {
                  var convertDataLog = new Date(log.dataLog)
                  let dateFormatedLog = ((convertDataLog.getDate() )) + "/" + ((convertDataLog.getMonth() + 1)) + "/" + convertDataLog.getFullYear(); 
                    return (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <HistoryIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={"Ação: "+log.acao} secondary={"CPF usuário afetado: "+log.cpfUsuarioAlterado+" | Data: "+dateFormatedLog} />
                    </ListItem>
                    )
                  })}
                  
                </List>
                </div>
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLogs} variant="contained" color="error">Fechar</Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
            Usuário registrado com sucesso !
          </Alert>
        </Snackbar>
      </>
    );


}

export default Register;