import Activity from "../models/activity.js";

export const getActivities = async (req, res, next) => {
  const { page, limit } = req.query;
  const { type } = req.query;

  let perPage = parseInt(limit);
  let pageNum = Math.max(0, parseInt(page));
  let paginationActivity;
  let sortActivities;
  try {
    if (type === undefined) {
      console.log("type ไม่มีค่า");
      // const activities = await Activity.find();

      // Get all activities
      // const dbQuery = {}

      // Get all activities without owner
      // const dbQuery = {owner: null}

      // Get all activities with owner
      const dbQuery = { owner: req.body.owner}
      console.log("req.body in activity.js controller : ", req.body.owner);
      paginationActivity = await Activity.find(dbQuery)
        .skip(perPage * (pageNum - 1))
        .limit(perPage)
        .sort({
          createdAt: -1,
        })
        .exec((err, activities) => {
          Activity.count().exec((err, count) => {
            res.status(200).json({
              activities: activities,
              pageNum: pageNum,
              totalActivities: count,
              pageSize: perPage,
            });
          });
        });
    } else {
      console.log("type มีค่าเป็น ", type);
      sortActivities = await Activity.find({ type: type, owner: req.body.owner }).sort({
        createdAt: -1,
      });
      res.status(200).json(sortActivities);
    }
    console.log("Get paginationActivity", paginationActivity);
    console.log("Get sortActivities", sortActivities);
  } catch (error) {
    next(error);
  }
};

export const createActivity = async (req, res, next) => {
  const newActivity = await Activity(req.body);
  console.log("create new activity", newActivity);

  try {
    const saveActivity = await newActivity.save();
    // console.log(saveActivity);
    res.status(201).json(saveActivity);
  } catch (error) {
    next(error);
  }
};

export const updateActivity = async (req, res, next) => {
  try {
    const updateActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log("updateActivity", updateActivity);
    res.status(200).json(updateActivity);
  } catch (error) {
    next(error);
  }
};

export const deleteActivity = async (req, res, next) => {
  try {
    const deleteActivity = await Activity.findByIdAndDelete(req.params.id);
    console.log("deleteActivity", deleteActivity);
    res.status(200).json(deleteActivity);
  } catch (error) {
    next(error);
  }
};

export const getActivityById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findById(id);
    console.log("Get Activity", activity);
    res.status(200).json(activity);
  } catch (error) {
    next(error);
  }
};
