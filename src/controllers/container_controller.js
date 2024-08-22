import * as containerService from "../services/container_services.js";

export const getContainer = async (req, res) => {
  try {
    const containerId = req.params.containerId;

    const result = await containerService.getContainer(containerId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllContainers = async (req, res) => {
  try {
    const result = await containerService.getAllContainers();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addContainer = async (req, res) => {
  try {
    const { data: container } = req.body;

    await containerService.addContainer(container);

    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addContainers = async (req, res) => {
  try {
    const { data: containers } = req.body;

    await containerService.addContainers(containers);

    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContainer = async (req, res) => {
  try {
    const { data: container } = req.body;

    await containerService.updateContainer(container);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContainers = async (req, res) => {
  try {
    const { data: containers } = req.body;

    await Promise.all(
      containers.map((container) => containerService.updateContainer(container))
    );

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContainer = async (req, res) => {
  try {
    const { data: container } = req.body;

    await containerService.deleteContainer(container);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContainers = async (req, res) => {
  try {
    const { data: containers } = req.body;

    await containerService.deleteContainers(containers);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
