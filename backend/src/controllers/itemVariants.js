const { getAllActiveItemVariants } = require('../services/itemVariants');
const { handleError } = require('../services/error');

exports.list = async (req, res) => {
  try {
    const allItemVariants = await getAllActiveItemVariants();

    const formattedItemVariants = await allItemVariants.map(
      ({ id, ...itemVariant }) => ({
        id,
        itemName: itemVariant.Item.name,
        variantName: itemVariant.Variant.name,
      }),
    );

    res.status(200).send(formattedItemVariants);
  } catch (error) {
    handleError(error, res);
  }
};
