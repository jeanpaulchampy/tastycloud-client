import React, {Component} from 'react';
import './App.css';
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';

class  App extends Component {
	
	state = {
		products: [],
		productToAdd: {
			name: 'sample product',
			price: 10 ,
			type: 'plat'
		},
		productToEdit:{
			productID: 0,
			name: '',
			price:0,
			type:'plat'
		},
		productToDelete: {
			productID: 0
		}
	}
	
	componentDidMount() {
		this.getProducts();
	}
	
	getProducts = _ => {
		fetch('http://localhost:4000/products')
			.then(response => response.json())
			.then(response => this.setState({ products: response.data}))
			.catch(err => console.error(err))
	}
	
	/*addProduct = _ => {
		const { productToAdd } = this.state;
		fetch(`http://localhost:4000/products/add?name=${productToAdd.name}&price=${productToAdd.price}&type=${productToAdd.type}`)
			.then(this.getProducts)
			.catch(err => console.error(err))
	}*/
	
	addProduct = _ => {
		const { productToAdd } = this.state;
		fetch(`http://localhost:4000/products/add`, {
			method: 'post',
			body: JSON.stringify(productToAdd),
			headers: {'Content-Type': 'application/json'},
		})
			.then(this.getProducts)
			.catch(err => console.error(err))
	}
	
	editProduct = _ => {
		const { productToEdit } = this.state;
		fetch(`http://localhost:4000/products/edit`, {
			method: 'put',
			body: JSON.stringify(productToEdit),
			headers: {'Content-Type': 'application/json'},
		})
			.then(this.getProducts)
			.catch(err => console.error(err))
	}
	
	deleteProduct = _ => {
		const { productToDelete } = this.state;
		fetch(`http://localhost:4000/products/delete`, {
			method: 'delete',
			body: JSON.stringify(productToDelete),
			headers: {'Content-Type': 'application/json'},
		})
			.then(this.getProducts)
			.catch(err => console.error(err))
	}
	
	renderProduct = ({ProductID, Name,Price,Type}) => 
            <TableRow key={ProductID}>
              <TableCell component="th" scope="row">{ProductID}</TableCell>
              <TableCell align="center">{Name}</TableCell>
              <TableCell align="center">{Price}</TableCell>
              <TableCell align="center">{Type}</TableCell>
            </TableRow>
   

	
	render(){
		const { products, productToAdd ,productToEdit,productToDelete} = this.state; 
		return (
			<div className="App">
				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
						  <TableRow>
							<TableCell>ProductID</TableCell>
							<TableCell align="center">Nom</TableCell>
							<TableCell align="center">Prix</TableCell>
							<TableCell align="center">Type</TableCell>
						  </TableRow>
						</TableHead>
						<TableBody>
							{products.map(this.renderProduct)}
						</TableBody>
					</Table>
				</TableContainer>
				
				
				<Grid 
				container
				direction="row" 
				justify="flex-end"
				alignItems="center"
				spacing={2}
				>
					<Grid item xs={2}>
						<TextField
						label="name"
						value={productToAdd.name}
						onChange={e => this.setState({productToAdd:  {...productToAdd, name: e.target.value }})} />
					</Grid>
					<Grid item xs={2}>
						<TextField
						label="price"
						value={productToAdd.price}
						onChange={e => this.setState({productToAdd:  {...productToAdd, price: e.target.value }})} />
					</Grid>
					<Grid item xs={2}>
						<InputLabel shrink >
							type 
						</InputLabel>
						 <Select
							value={productToAdd.type}
							onChange={e => this.setState({productToAdd:  {...productToAdd, type: e.target.value }})} 
							autoWidth
						>
							<MenuItem value={"entree"}>entree</MenuItem>
							<MenuItem value={"plat"}>plat</MenuItem>
							<MenuItem value={"dessert"}>dessert</MenuItem>
							<MenuItem value={"boisson"}>boisson</MenuItem>
							<MenuItem value={"autre"}>autre</MenuItem>
						</Select>
					</Grid>
					<Grid item xs={2}>
						<Button variant="contained" color="primary" onClick={this.addProduct}>Add product </Button>
					</Grid>
				</Grid>
				
				<Grid 
				container
				direction="row" 
				justify="flex-end"
				alignItems="center"
				spacing={2}
				>
					<Grid item xs={2}>
						<TextField
						label="productID"
						value={productToEdit.productID}
						onChange={e => this.setState({productToEdit:  {...productToEdit, productID: e.target.value }})} />
						</Grid>
					<Grid item xs={2}>
					<TextField
					label="name"
					value={productToEdit.name}
					onChange={e => this.setState({productToEdit:  {...productToEdit, name: e.target.value }})} />
					</Grid>
					<Grid item xs={2}>
					<TextField
					label="price"
					value={productToEdit.price}
					onChange={e => this.setState({productToEdit:  {...productToEdit, price: e.target.value }})} />
					</Grid>
					<Grid item xs={2}>
					<InputLabel shrink >
							type 
						</InputLabel>
						 <Select
							value={productToEdit.type}
							onChange={e => this.setState({productToEdit:  {...productToEdit, type: e.target.value }})} 
							autoWidth
						>
							<MenuItem value={"entree"}>entree</MenuItem>
							<MenuItem value={"plat"}>plat</MenuItem>
							<MenuItem value={"dessert"}>dessert</MenuItem>
							<MenuItem value={"boisson"}>boisson</MenuItem>
							<MenuItem value={"autre"}>autre</MenuItem>
						</Select>
					</Grid>
					<Grid item xs={2}>
					<Button variant="contained" color="primary" onClick={this.editProduct}>Edit Product </Button>
					</Grid>

				</Grid>
				
				<Grid 
				container
				direction="row" 
				justify="flex-end"
				alignItems="center"
				spacing={2}
				>
					<Grid item xs={2}>
						<TextField
						label="productID"
						value={productToDelete.productID}
						onChange={e => this.setState({productToDelete:  {...productToDelete, productID: e.target.value }})} />
					</Grid>
					<Grid item xs={2}>
						<Button variant="contained" color="primary" onClick={this.deleteProduct}>Delete Product </Button>
					</Grid>
				</Grid>
				
				
			</div>
		);
	}
}


export default App;
