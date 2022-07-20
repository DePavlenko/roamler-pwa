import axios from "axios";
import { University } from "../../types";

export class UniversitiesService {
  async getUniversities(country: string): Promise<University[]> {
    const response = await axios.get(
      `http://universities.hipolabs.com/search?country=${country}`
    );
    return response.data;
  }
}
