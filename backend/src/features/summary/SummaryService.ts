import prisma from "../../lib/prisma";
import { NotFoundException } from "../../lib/exceptions";
import ResponseBuilder from "../../lib/response-builder";
import { type CreateSummaryDTO, type UpdateSummaryDTO } from "./SummaryTypes";

export default class SummaryService {
  async find() {
    const summaries = await prisma.summarizedCourse.findMany({
      include: {
        Course: true,
        User: {
          select: { id: true, name: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new ResponseBuilder(summaries)
      .setExcludedFields([])
      .build("summaries");
  }

  async findOne(id: string) {
    const summary = await prisma.summarizedCourse.findUnique({
      where: { id },
      include: {
        Course: true,
        User: {
          select: { id: true, name: true },
        },
      },
    });

    if (!summary) {
      throw new NotFoundException("Summary not found");
    }

    return new ResponseBuilder(summary)
      .setExcludedFields([])
      .build("summaries");
  }

  async create(data: CreateSummaryDTO) {
    const summary = await prisma.summarizedCourse.create({
      data: {
        summary: data.summary,
        Course: { connect: { id: data.courseId } },
        User: { connect: { id: data.userId } },
      },
    });

    return new ResponseBuilder(summary)
      .setExcludedFields([])
      .build("summaries");
  }

  async update(id: string, data: UpdateSummaryDTO) {
    const summary = await prisma.summarizedCourse.findUnique({
      where: { id },
    });

    if (!summary) {
      throw new NotFoundException("Summary not found");
    }

    const updatedSummary = await prisma.summarizedCourse.update({
      where: { id },
      data,
    });

    return new ResponseBuilder(updatedSummary)
      .setExcludedFields([])
      .build("summaries");
  }

  async delete(id: string) {
    const summary = await prisma.summarizedCourse.findUnique({
      where: { id },
    });

    if (!summary) {
      throw new NotFoundException("Summary not found");
    }

    await prisma.summarizedCourse.delete({ where: { id } });
    return new ResponseBuilder({ message: "Summary deleted successfully" })
      .setExcludedFields([])
      .build("summaries");
  }
}
