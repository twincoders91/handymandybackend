const pool = require("../db/db");
const queries = require("../queries/queries");

const getServices = (req, res) => {
  pool.query(queries.getServices, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getServicesByHMId = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getServicesByHMId, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addServices = (req, res) => {
  const { hm_id, description, category, types_of_work, price_from, title } =
    req.body;

  pool.query(
    queries.addServices,
    [hm_id, description, category, types_of_work, price_from, title],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Services created Successfully!");
      console.log("Services created");
    }
  );
};

const getServiceInfo = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getServiceInfo, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const removeServicesById = (req, res) => {
  const id = parseInt(req.body.id);

  pool.query(queries.removeServicesById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send("Service removed successfully");
  });
};

const updateServicesById = (req, res) => {
  const id = parseInt(req.body.id);

  const { description, category, types_of_work, price_from, title } = req.body;

  pool.query(
    queries.updateServicesById,
    [description, category, types_of_work, price_from, title, id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send("Updated services successfully!");
    }
  );
};

const filterServicesByCategory = (req, res) => {
  const { category } = req.params;

  pool.query(queries.filterServicesByCategory, [category], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getServices,
  getServicesByHMId,
  addServices,
  getServiceInfo,
  removeServicesById,
  updateServicesById,
  filterServicesByCategory,
};
