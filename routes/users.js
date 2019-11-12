//framework
const express = require('express')
const app = express()

//database	
var mysql = require('mysql');	
var connection = mysql.createConnection({	
  host     : 'localhost',	
  user     : 'root',	
  password : '',	
  database : 'perpus_online'	
});	
	
//Database connection	
connection.connect(function(err) {	
  if (err) {	
    console.error('error connecting: ' + err.stack);	
    return;	
  }	
	
  console.log('connected as id ' + connection.threadId)	
});	
	
	
	
app.get('/book', function (req, res) {	
	try{
		connection.query('SELECT * From buku', function (error, results, fields) {
			if (error) throw error;
			//console.log(results);
			res.json(results);
			// error will be an Error if one occurred during the query
			// results will contain the results of the query
			// fields will contain information about the returned results fields (if any)
		})
	} catch(err) {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

app.get('/book/:Judul', function (req, res) {
	try{
		var query = 'SELECT * FROM buku WHERE Judul_Buku = ?'
		connection.query(query, (req.params.Judul), function (error, results, fields) {
			if (error) throw error;
			//console.log(results);
			res.json(results);
		})
	} catch(err) {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

app.get('/jurnal', function (req, res) {	
	try{
		connection.query('SELECT * From jurnal', function (error, results, fields) {
			if (error) throw error;
			//console.log(results);
			res.json(results);
			// error will be an Error if one occurred during the query
			// results will contain the results of the query
			// fields will contain information about the returned results fields (if any)
		})
	} catch(err) {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

app.get('/jurnal/:id', function (req, res) {	
	try{
		var query = 'SELECT * From jurnal WHERE IDJurnal = ?'
		connection.query(query, (req.params.id), function (error, results, fields) {
			if (error) throw error;
			//console.log(results);
			res.json(results);
			// error will be an Error if one occurred during the query
			// results will contain the results of the query
			// fields will contain information about the returned results fields (if any)
		})
	} catch(err) {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

app.get('/mahasiswa', function (req, res) {	
	try{
		connection.query('SELECT * From mahasiswa', function (error, results, fields) {
			if (error) throw error;
			//console.log(results);
			res.json(results);
			// error will be an Error if one occurred during the query
			// results will contain the results of the query
			// fields will contain information about the returned results fields (if any)
		})
	} catch(err) {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

app.get('/mahasiswa/:nim', function (req, res) {	
	try{
		var query = 'SELECT * From mahasiswa WHERE NIM = ?'
		connection.query(query, (req.params.nim), function (error, results, fields) {
			if (error) throw error;
			//console.log(results);
			res.json(results);
			// error will be an Error if one occurred during the query
			// results will contain the results of the query
			// fields will contain information about the returned results fields (if any)
		})
	} catch(err) {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

app.get('/peminjaman', function (req, res) {	
	try{
		connection.query('SELECT * From peminjaman', function (error, results, fields) {
			if (error) throw error;
			//console.log(results);
			res.json(results);
			// error will be an Error if one occurred during the query
			// results will contain the results of the query
			// fields will contain information about the returned results fields (if any)
		})
	} catch(err) {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

app.get('/peminjaman/:id', function (req, res) {	
	try{
		var query = 'SELECT * From peminjaman WHERE IDPeminjaman = ?'
		connection.query(query, (req.params.id), function (error, results, fields) {
			if (error) throw error;
			//console.log(results);
			res.json(results);
			// error will be an Error if one occurred during the query
			// results will contain the results of the query
			// fields will contain information about the returned results fields (if any)
		})
	} catch(err) {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

function checkstock(stock){
    return (stock>=0);
}

function checkactive(nim){
    try{
		var query = 'SELECT * From peminjaman WHERE NIM = ? and aktif = "1"'
		connection.query(query,nim, function (error, results, fields) {
			if (error) throw error;
			//console.log(results);
            var res = results;
            return (res!=null)
			// error will be an Error if one occurred during the query
			// results will contain the results of the query
			// fields will contain information about the returned results fields (if any)
		})
	} catch(err) {
		console.log(err)
    }
}

//function check tanggal
//app.put for changing active status
//app.post for adding new peminjaman
//app.get for get peminjaman by nim
//app.get for get books by author
//app.get for get jurnal by judul
//app.get for get jurnal by author

module.exports = app;