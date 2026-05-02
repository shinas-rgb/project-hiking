import * as placeService from "./place.service.js"

export const getAllPlacesController = async (req, res, next) => {
  try {
    const result = await placeService.getAllPlaces(req.query)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export const createPlaceController = async (req, res, next) => {
  try {
    const userId = req.user.id
    const result = await placeService.createPlace(req.data, userId)
    res.status(201).json({ data: result, message: "Place created" })
  } catch (error) {
    next(error)
  }
}

export const getPlaceByIdController = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await placeService.getPlaceById(id)
    res.status(200).json({ data: result })
  } catch (error) {
    next(error)
  }
}

export const updatePlaceController = async (req, res, next) => {
  try {
    const userId = req.user.id
    const result = await placeService.updatePlace(req.body, req.prams.id, userId)
    res.status(200).json({ data: result })
  } catch (error) {
    next(error)
  }
}

export const deletePlaceController = async (req, res, next) => {
  try {
    const userId = req.user.id
    const result = await placeService.deletePlace(req.params.id, userId)
    res.status(200).json({ data: result, message: "Place deleted" })
  } catch (error) {
    next(error)
  }
}
