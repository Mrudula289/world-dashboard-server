const db = require("../config/db");



exports.getStats = async (req, res) => {

  try {

    const queries = {

      countries:
      "SELECT COUNT(*) AS total FROM country",


      cities:
      "SELECT COUNT(*) AS total FROM city",


      population:
      "SELECT SUM(Population) AS total FROM country",


      languages:
      "SELECT COUNT(DISTINCT Language) AS total FROM countrylanguage"

    };


    db.query(queries.countries, (err, countryResult)=>{

      if(err) throw err;


      db.query(queries.cities,(err,cityResult)=>{

        if(err) throw err;


        db.query(queries.population,(err,popResult)=>{

          if(err) throw err;


          db.query(queries.languages,(err,langResult)=>{

            if(err) throw err;


            res.json({

              countries: countryResult[0].total,

              cities: cityResult[0].total,

              population: popResult[0].total || 0,

              languages: langResult[0].total

            });


          });


        });


      });


    });


  }

  catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};







exports.getTopCountries = (req,res)=>{


const query=`

SELECT Name, Population

FROM country

ORDER BY Population DESC

LIMIT 10

`;


db.query(query,(err,result)=>{

if(err)

return res.status(500).json(err);


res.json(result);


});


};








exports.getContinentPopulation=(req,res)=>{


const query=`

SELECT Continent,

SUM(Population) AS Population

FROM country

GROUP BY Continent

`;



db.query(query,(err,result)=>{


if(err)

return res.status(500).json(err);


res.json(result);


});


};








exports.getLargestCountries=(req,res)=>{


const query=`

SELECT Name, SurfaceArea

FROM country

ORDER BY SurfaceArea DESC

LIMIT 10

`;



db.query(query,(err,result)=>{


if(err)

return res.status(500).json(err);


res.json(result);


});


};








exports.getCountriesByRegion=(req,res)=>{


const query=`

SELECT Region,

COUNT(*) AS Countries

FROM country

GROUP BY Region

ORDER BY Countries DESC

`;



db.query(query,(err,result)=>{


if(err)

return res.status(500).json(err);


res.json(result);


});


};









exports.getLanguagesBySpeakers=(req,res)=>{


const query=`

SELECT 

cl.Language,

ROUND(SUM(c.Population * cl.Percentage / 100))

AS Speakers


FROM countrylanguage cl


JOIN country c

ON c.Code = cl.CountryCode


GROUP BY cl.Language


ORDER BY Speakers DESC


LIMIT 10

`;



db.query(query,(err,result)=>{


if(err)

return res.status(500).json(err);


res.json(result);


});


};










exports.searchCountry=(req,res)=>{


const {name}=req.query;



if(!name){

return res.status(400).json({

message:"Country name required"

});

}



const query=`

SELECT

Name,

Continent,

Region,

Population,

LifeExpectancy

FROM country


WHERE Name LIKE ?

`;



db.query(

query,

[`%${name}%`],


(err,result)=>{


if(err)

return res.status(500).json(err);



res.json(result);


}


);



};