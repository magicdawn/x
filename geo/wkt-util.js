const wkx = require('wkx')

/**
 * to geojson
 */

exports.parse = function(text) {
  const geojson = wkx.Geometry.parse(text).toGeoJSON()
  return geojson
}

/**
 * to wkt
 */

exports.stringify = function(geojson) {
  const text = wkx.Geometry.parseGeoJSON(geojson).toWkt()
  return text
}
