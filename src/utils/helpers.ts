const helpers = {
  buildCurrentUrlWithParameter(param: string, paramVal: string | null) {
    if (typeof window === "undefined") {
      return "/";
    }
    // Lấy URL hiện tại
    const currentUrl = window.location.href;
    const newUrl = new URL(currentUrl);

    if (paramVal === null) {
      // Nếu paramVal là null, loại bỏ tham số
      newUrl.searchParams.delete(param);
    } else {
      // Nếu không, cập nhật giá trị tham số
      newUrl.searchParams.set(param, paramVal);
    }

    // Trả về URL mới
    return newUrl.toString();
  },
};

export default helpers;
