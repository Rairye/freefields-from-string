/*
Copyright 2022 Rairye
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

function setAsNextField(field){
  
  var charCodes = new Set([9, 10, 11, 12, 13, 28, 29, 30, 31, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288]);

  for (var i = 0; i < field.length; i++) {
      if (charCodes.has(field.charCodeAt(i))==false) {
        return true;
      }
  }

    return false;

}

function findStartIndicies(string, field, searchStartIndex, firstOnly = true) {

  var startIndicies = [];
  var stringLength = string.length;
  var fieldLength = field.length;
  var i = 0;

  while (i <= stringLength) {
      var firstIndex = string.substring(i).search(field);

      if (firstIndex == -1) {
         break;
      }

      else {
          firstIndex += i;
          var secondIndex = firstIndex + fieldLength;
          startIndicies.push([firstIndex + searchStartIndex, secondIndex + searchStartIndex]);
          i += secondIndex;

          if (firstOnly == true) {
            break;
          }

      }

  }

  return startIndicies;
}


function getFieldIValues(source, fields) {
  var searchStartIndex = 0;
  var results = {}
  var lastFieldName = null;
  var lastFieldIndicies = null;

  for (var i = 0; i <fields.length; i++) {

    field = fields[i];
    
    var currentIndicies = findStartIndicies(source.substring(searchStartIndex), field, searchStartIndex);

    var indiciesCount = currentIndicies.length;

    if (indiciesCount > 0) {

      searchStartIndex+= currentIndicies[0][1];

      if (lastFieldName != null && lastFieldIndicies != null) {
          var lastIndiciesCount = lastFieldIndicies.length;
          var valueStartIndex = 0;
          var valueEndIndex = 0;

          if (indiciesCount > 1 && lastIndiciesCount > 1) {
              valueStartIndex = lastFieldIndicies[0][1] + 1;
              valueEndIndex = currentIndicies[indiciesCount - 1][0];

          }

          else  {
              valueStartIndex = lastFieldIndicies[0][1] + 1;
              valueEndIndex = currentIndicies[0][0];
          }

          results[lastFieldName] = source.substring(valueStartIndex, valueEndIndex);

      }

    var setField = setAsNextField(field);

    lastFieldName = setField == true ? field : null;
    lastFieldIndicies = setField == true ? currentIndicies : null;

    }

    else {
        lastFieldName = null;
        lastFieldIndicies = null;
    }

  }

      if (lastFieldName != null && lastFieldIndicies != null) {
          results[lastFieldName] = source.substring(lastFieldIndicies[0][1]);
      }


  return results;

}
