import prisma from "../../core/prisma_client";
import { AddressCreateBody, AddressUpsert } from "./address.validation";

export default class AddressService {
  create = async (body: AddressCreateBody) => {
    const country = await this.upsertCountry(body);
    const state = await this.upsertState(country, body);
    const city = await this.upsertCity(state, body);
    const area = await this.upsertArea(city, body);
    const postalCode = await this.upsertPostalCode(area, body);
    return {
      countryId: country.id,
      stateId: state.id,
      cityId: city.id,
      areaId: area?.id,
      postalCodeId: postalCode?.id,
    };
  };

  upsert = async (data?: AddressUpsert) => {
    if (data == null) return {};
    const country = await this.upsertCountry(data);
    const state = await this.upsertState(country, data);
    const city = await this.upsertCity(state, data);
    const area = await this.upsertArea(city, data);
    const postalCode = await this.upsertPostalCode(area, data);
    return {
      countryId: country.id,
      stateId: state.id,
      cityId: city.id,
      areaId: area?.id,
      postalCodeId: postalCode?.id,
    };
  };

  private upsertPostalCode(
    area?: { id: number; name: string; cityId: number },
    body?: { postalCode?: string }
  ) {
    if (area == null) return;
    if (body?.postalCode == null) return;
    return prisma.postalCode.upsert({
      where: {
        areaId_code: {
          areaId: area.id,
          code: body.postalCode,
        },
      },
      create: {
        areaId: area.id,
        code: body.postalCode,
      },
      update: {},
    });
  }

  private upsertArea(
    city: { id: number; name: string; stateId: number },
    body?: { area?: string }
  ) {
    if (body?.area == null) return;
    return prisma.area.upsert({
      where: {
        cityId_name: {
          cityId: city.id,
          name: body.area,
        },
      },
      create: {
        name: body.area,
        cityId: city.id,
      },
      update: {},
    });
  }

  private upsertCity(
    state: { id: number; name: string; countryId: number },
    body: { city: string }
  ) {
    return prisma.city.upsert({
      where: {
        stateId_name: {
          stateId: state.id,
          name: body.city,
        },
      },
      create: {
        name: body.city,
        stateId: state.id,
      },
      update: {},
    });
  }

  private upsertState(
    country: { id: number; name: string; code: string },
    body: { state: string }
  ) {
    return prisma.state.upsert({
      where: {
        countryId_name: {
          name: body.state,
          countryId: country.id,
        },
      },
      create: {
        name: body.state,
        countryId: country.id,
      },
      update: {},
    });
  }

  private upsertCountry(body: { country: string; countryCode: string }) {
    return prisma.country.upsert({
      where: {
        code: body.countryCode,
      },
      create: {
        name: body.country,
        code: body.countryCode,
      },
      update: {
        name: body.country,
        code: body.countryCode,
      },
    });
  }
}
