import isEmpty from "lodash/isEmpty";

const API_URL = "https://jsonplaceholder.typicode.com";

export default {
  /**
   *
   * @param {string} path Api endpoint to hit eg: 'users'
   * @param {number} id id of the model requested
   * @param {object} params an object containing key-value pair for query parameters
   */
  async getRequest(path, params = {}, id = null) {
    const option = {
      method: "GET"
    };

    let url;
    let queryString = "";

    if (!isEmpty(params)) {
      queryString = "?";

      Object.keys(params).map((key, index) => {
        queryString += key + "=" + params[key] + "&";

        return params[key];
      });

      queryString = queryString.replace(/&\s*$/, "");
    }

    if (id) {
      url = API_URL + "/" + path + "/" + id;
    } else {
      url = API_URL + "/" + path;
    }
    url += queryString;

    const request = new Request(url, option);
    const responseData = {
      success: false,
      error: true,
      data: []
    };

    await fetch(request)
      .then(async response => {
        if (response.ok) {
          return await response.json();
        }
        throw response;
      })
      .then(async response => {
        responseData.success = true;
        responseData.error = false;
        responseData.data = response;
      })
      .catch(async error => {
        try {
          responseData.data = await error.json();
        } catch (error) {
          responseData.data = { message: "Something went wrong" };
        }
      });

    return responseData;
  },

  /**
   *
   * @param {string} path Api endpoint to hit eg: 'users'
   * @param {number} id id of the model requested
   * @param {*} params object containing request parameters
   */
  async deleteRequest(path, id = null, params = {}) {
    const option = {
      method: "DELETE"
    };

    let url;
    let queryString = "";

    if (!isEmpty(params)) {
      queryString = "?";

      Object.keys(params).map((key, index) => {
        queryString += key + "=" + params[key] + "&";

        return params[key];
      });

      queryString = queryString.replace(/&\s*$/, "");
    }

    if (id) {
      url = API_URL + "/" + path + "/" + id;
    } else {
      url = API_URL + "/" + path;
    }
    url += queryString;

    const request = new Request(url, option);
    let responseData = {
      success: false,
      error: true,
      data: []
    };

    await fetch(request)
      .then(async response => {
        if (response.ok) {
          return await response.json();
        }
        throw response;
      })
      .then(response => {
        responseData.success = true;
        responseData.error = false;
        responseData.data = response;
      })
      .catch(async error => {
        try {
          responseData.data = await error.json();
        } catch (error) {
          responseData.data = { message: "Something went wrong" };
        }
      });

    return responseData;
  }
};
