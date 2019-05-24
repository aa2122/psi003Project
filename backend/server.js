
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var xlsx = require('xlsx');

var Issue = require('./models/issue');
var Professor = require('./models/professor');
var UC = require('./models/uC');


const app = express();
const router = express.Router();

var workbook = xlsx.readFile('DI-2018_19.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
<<<<<<< HEAD
=======
//console.log(xlData);
<<<<<<< HEAD
=======
console.log("Teste: ");
>>>>>>> bf3587ee25929bb497670c47fef637de2d6824f9


function insertUC(xlData){
    for (var i = 0; i < 4; i++){
        
        var obj = xlData[i];
        var uc = new UC();
        for (var key in obj){
            var value = obj[key];
            
            if(key == "CODIGO_UC") uc.codigo = value;
            else if(key == "UNIDADE_CURRICULAR") uc.nome = value;
            else if(key == "REGENTE"){
                var p = new Professor({nome: value})
                p.save();
                uc.regente = p._id;
            }
          var value = obj[key];
          console.log("--->  " + key + ": " + value);
          uc.save();

        }
      }
}

function insertProf(xlData){
    for(var i = 0; i < xlData.length; i++){
        var obj = xlData[i];
        console.log(obj);
        for(var j = 0; j < obj.length; j++){

            console.log(obj[j]);
            
            if(key.toUpperCase() == "SERVICO_DOCENTE"){
                var value = obj[j];
                console.log("Value:  " + value);

                Professor.find({nome: value}).limit(1).then( (data) => {
                    console.log(data);
                    if(data.length === 0){
                       // console.log(data);
                       var  p = new Professor({nome: value});

                       p.save()
                        .then(issue => {
                        console.log("success!");
                        })
                        .catch(err => {
                       console.log('Failed to create new record');
                    })
                       //console.log("Professor:  " + p);
                      
                    }else{
                        console.log("Jah existe essa pessoa.");
                    }
                });
            }
        }
    }

<<<<<<< HEAD
}
=======
>>>>>>> 29eb72fbf8c652e62a02fec1ad396a236d9a9f13
>>>>>>> bf3587ee25929bb497670c47fef637de2d6824f9

console.log("Teste: ");

    console.log(xlData[0]);

    var Latinise={};
    Latinise.latin_map={
        "á":"a",
        "ã":"a",
        "õ":"o",
        "ó":"o",
        "ç":"c"};
   
    String.prototype.latinise=function(){return this.replace(/[^A-Za-z0-9\[\] ]/g,function(a){return Latinise.latin_map[a]||a})};
    String.prototype.latinize=String.prototype.latinise;

    console.log(xlData[0].DEPARTAMENTO.latinise());
//Adicionar regentes
var i;
for (i = 0; i < xlData.length; i++) {

    if (!baseDados) {

        baseDados.add(new Professor({xlData[i].REGENTE.latinise(), xlData[i].TIPO_DE_REGENTE.latinise(), ?, "Regente", ?, ?}));

    } else {

        //adicionar cadeira se ainda nao estiver na lista de cadeiras

    }

}




///////////

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/teste',  {useNewUrlParser: false}, (err) => {  //mongodb://psi003:psi003@localhost:27017/psi003?retryWrites=true&authSource=psi003
    if(err)
        console.log(err);
    else
        console.log('Connected.');
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

//insertUC(xlData);
insertProf(xlData);

router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);
    });
});

router.route('/issues/:id').get((req, res) => {
    var name = re.params.id
    Issue.findOne({}, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    });
});

router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);

    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added sucessfully'});
            console.log("success!");
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        })
});

router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load document'));
        else{
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    });
});

<<<<<<< HEAD
=======


    var joao = new Professor({ nome: "Joao"});

    joao.save(function (err) {
        if (err) console.log("primeiro" + err);
      
        var uc = new UC({
            nome: "Aplicacoes Web",
            regente: joao._id });
      
        uc.save(function (err) {
          if (err) return console.log("segundo" + err); //mongo --username psi003 --password --authenticationDatabase psi003 appserver.alunos.di.fc.ul.pt/psi003
          // thats it!
        });
      });

<<<<<<< HEAD
     console.log(Professor.find({name: "Joao"}).select("nome"));
=======
     var query = Professor.find();
     query.select("_id nome");

     query.exec(function(err, data){
        if(err) return handleError(err);

        console.log(data);
        console.log("---------------------------------------------------------------------------------------------------------------");
        console.log(data[0]);
     });
>>>>>>> 29eb72fbf8c652e62a02fec1ad396a236d9a9f13

      //console.log(myId);


      //console.log(UC.find({_id: myId}).regente.nome);



>>>>>>> bf3587ee25929bb497670c47fef637de2d6824f9
app.use('/', router);

app.listen(3003, () => console.log("Express server running on port 3003"));
